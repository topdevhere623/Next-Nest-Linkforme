import { isServer, PORT } from '../constants/env';

type FetchContext = {
  basePath: string;
};

const context: FetchContext = {
  basePath: '',
};

const initializeFetch = (basePath: string) => {
  context.basePath = basePath;
};

const getFetchUrl = (url: string) => {
  if (isServer) {
    return url.startsWith('/') ? `http://localhost:${PORT}${url}` : url;
  }

  return url.startsWith('/') ? context.basePath + url : url;
};

const envAwareFetch = (url: string, options?: Partial<RequestInit>) => {
  const fetchUrl = getFetchUrl(url);

  return fetch(fetchUrl, options).then((res) => res.json());
};

const validateEmail = (email:string) => {
  if(!email) return false;
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!result;
};

function isValidHttpUrl(string:string|undefined) {

  if(!string) return false;

  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function setCookie(name:string,value:string,days:number) {
  let expires = "";
  if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function getCookie(name:string) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export { envAwareFetch as fetch, initializeFetch, validateEmail, isValidHttpUrl, setCookie, getCookie };
