import {
    Body, Controller,
    Get,
    Param, Post, Render, Req, Res, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RenderableResponse } from 'nest-next';
import { User as UserSchema } from 'src/server/users/interfaces/user.interface';
import { AnalyticService } from './analytics/analytics.service';
import { AuthService, IErr } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { FilesService } from './gridfs/gridfs.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { ParamsInterceptor } from './params.interceptor';
import { UsersService } from './users/users.service';

interface BusBoyRequest extends Request {
  busboy: any
}

interface RequestAnalytics extends Request {
  analyticsData?: {
    clicks: number,
    views: number
  }
}

declare global {
  namespace Express {
    interface User extends UserSchema {}
  }

  interface IncomingMessage {
    user: UserSchema
  }
}
@Controller()
export class AppController {
  uploadFile = (req:BusBoyRequest) => {
    return new Promise(resolve => {
      req.pipe(req.busboy);
      req.busboy.on('file',  (fieldname:string, file:any, filename:string, encoding:any, mimetype:string) => {
        const type = filename.match(/.(jpg|jpeg|png|gif|mp4)$/g);
        
        if(!type) return {}
        
        let writeStream = this.filesService.createWriteStream(type[0])
        
        file.pipe(writeStream);
        
        writeStream.on('close', function (result:any){
          resolve(result)
          console.log("APP IMAGE UPLOAD ... Result", result)
        });
      });
    })
  }
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly filesService: FilesService,
    private readonly analyticService: AnalyticService
  ) {}

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor)
  home() {
    return {};
  }

  @Get('/login')
  @Render('login')
  @UseInterceptors(ParamsInterceptor)
  login() {
    return {};
  }

  @Get('/logup')
  @Render('logup')
  @UseInterceptors(ParamsInterceptor)
  logup() {
    return {};
  }

  @Get('/restore')
  @Render('restore')
  @UseInterceptors(ParamsInterceptor)
  restore() {
    return {};
  }

  @Get('/restore/:uuid')
  @UseInterceptors(ParamsInterceptor)
  validateRestore(@Param('uuid') uuid:string,@Res() res: Response) {
    return this.authService.validateRestore(uuid, res)
  }

  

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Get('/account')
  @Render('account')
  @UseInterceptors(ParamsInterceptor)
  account() {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Get('/account/buttons')
  @Render('account/buttons')
  @UseInterceptors(ParamsInterceptor)
  buttons() {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Get('/account/settings')
  @Render('account/settings')
  @UseInterceptors(ParamsInterceptor)
  settings() {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Get('/account/pro')
  @Render('account/pro')
  @UseInterceptors(ParamsInterceptor)
  pro() {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Get('/account/style')
  @Render('account/style')
  @UseInterceptors(ParamsInterceptor)
  style() {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Get('/account/analytics')
  @UseInterceptors(ParamsInterceptor)
  async analytics(@Req() req:RequestAnalytics, @Res() res: RenderableResponse) {
    const analyticsData = await this.analyticService.getLastAnalytics(req.user)
    req.analyticsData = analyticsData;
    res.render('account/analytics');
  }

  @Get(':id')
  async staticGenerator(@Param('id') id:any,@Res() res: RenderableResponse, @Req() req:Request) {
    
    try {
      this.analyticService.create({user: id, type: 'view'})
    } catch (error) {
      
    }

    if(req?.cookies?.jwt){
      const user =  await this.authService.verifyUser(req, req.cookies.jwt)

      if(user?._id === id){
        res.render("preview/"+id);
      }else{
        res.render(id);
      }
    }else{
      res.render(id);
    }

  }

  @Get('/link/:id')
  public linkShortener(@Param('id') id:any,@Res({passthrough: true}) res: Response){
    return this.userService.linkShortener(id, res)
  }

  @Post('/api/login')
  async loginApi(@Body() body:any, @Res({passthrough: true}) res:Response): Promise<IErr> {
    return this.authService.login(body, res);
  }

  @Post('/api/restore')
  async restoreApi(@Body() body:any): Promise<IErr | any> {
    return this.authService.restore(body);
  }

  @Post('/api/logup')
  async logupApi(@Body() body:any, @Res({passthrough: true}) res:Response): Promise<IErr> {
    return this.authService.logup(body, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/setFields')
  async setFields(@Body() body:any, @Req() req:Request): Promise<IErr | any> {
    if(req.user){
      return this.userService.setFields(body, req.user._id);
    }
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/updateUser')
  async updateUser(@Body() body:any, @Req() req:Request): Promise<IErr | any> {
    if(req.user){
      return this.userService.updateUser(body, req.user._id);
    }
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/deleteUser')
  async deleteUser(@Req() req:Request): Promise<IErr | any> {
    if(req.user){
      return this.userService.deleteUser(req.user._id);
    }
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/setTheme')
  async setTheme(@Body() body:any, @Req() req:Request): Promise<IErr | any> {
    if(req.user && body?.newTheme){
      return this.userService.setTheme(body?.newTheme, req.user._id);
    }
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/setYourImage')
  async setYourImage(@Req() req:BusBoyRequest): Promise<IErr | any> {

    if(req.user){
      const file:any = await this.uploadFile(req);
      return {...file}
    }
    return {}
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/api/getAnalytics')
  async getAnalytics(@Req() req:Request): Promise<IErr | any> {
    if(req.user){
      return await this.analyticService.getLastAnalytics(req.user)
    }
    return {}
  }

  @Get('/file/:filename')
  public async getFile(@Param('filename') filename:string,@Res() res: Response) {
    const fileBuffer:any = await this.filesService.readFile(filename)
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-disposition': 'inline',
        'Content-Length': fileBuffer.length
    });
    res.end(Buffer.from(fileBuffer, 'binary'));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/setAvatar')
  async setAvatar(@Req() req:BusBoyRequest): Promise<IErr | any> {

    if(req.user){
      const file:any = await this.uploadFile(req);
      return this.userService.setAvatar(file.filename, req.user._id);
    }
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/setThumbPic')
  async setThumbPic(@Req() req:BusBoyRequest): Promise<IErr | any> {

    if(req.user){
      const file:any = await this.uploadFile(req);
      return {...file}
    }
    return {}
  }

  @Post('/api/getFields')
  async getFields(@Body() body:any): Promise<IErr | any> {
    return this.userService.getFields(body);
  }
}
