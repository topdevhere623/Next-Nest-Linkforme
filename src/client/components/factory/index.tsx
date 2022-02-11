import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    DragDropContext, Draggable, Droppable, resetServerContext
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar, setEditDone } from 'src/client/store/factory/actions';
import { IStoreState } from 'src/client/store/reducers';
import { Field } from 'src/server/users/interfaces/user.interface';
import AmazonIcon from '../../static/socialIcons/amazon.svg';
import ApplemusicIcon from '../../static/socialIcons/applemusic.svg';
import BandcampIcon from '../../static/socialIcons/bandcamp.svg';
import CameoIcon from '../../static/socialIcons/cameo.svg';
import ClubhouseIcon from '../../static/socialIcons/clubhouse.svg';
import FacebookIcon from '../../static/socialIcons/facebook.svg';
import InstagramIcon from '../../static/socialIcons/instagram.svg';
import LinkedinIcon from '../../static/socialIcons/linkedin.svg';
import MailIcon from '../../static/socialIcons/mail.svg';
import PatreonIcon from '../../static/socialIcons/patreon.svg';
import PinterestIcon from '../../static/socialIcons/pinterest.svg';
import SignalIcon from '../../static/socialIcons/signal.svg';
import SnapchatIcon from '../../static/socialIcons/snapchat.svg';
import SoundcloudIcon from '../../static/socialIcons/soundcloud.svg';
import SpotifyIcon from '../../static/socialIcons/spotify.svg';
import SubstackIcon from '../../static/socialIcons/substack.svg';
import TelegramIcon from '../../static/socialIcons/telegram.svg';
import TiktokIcon from '../../static/socialIcons/tiktok.svg';
import TwitchIcon from '../../static/socialIcons/twitch.svg';
import TwitterIcon from '../../static/socialIcons/twitter.svg';
import YoutubeIcon from '../../static/socialIcons/youtube.svg';
import ElementFilter from '../elements';
import Link from '../elements/link';
import styles from './styles.module.sass';


resetServerContext();
interface IProps {
  fields: Field[];
  userName?: string;
  avatar?: string;
  noEdit?: boolean;
}

const reorder = (list: Field[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const SocialIcons = ({ fields, fill = '#B78467', theme }: any) => {
  if (!fields || !fields.length) return null;

  const socialIcons = fields.filter(
    (field: Field) => /socialIcon\-/g.test(field.type) && field.link,
  );

  if (theme?.custom?.socialIconsColor) {
    fill = theme.custom.socialIconsColor;
  }

  return (
    <div className={styles.socialIcons}>
      {socialIcons.map((field: Field) => (
        <Link data={field} key={field.id}>
          {/mail/g.test(field.type) && <MailIcon width={22} fill={fill} />}
          {/facebook/g.test(field.type) && (
            <FacebookIcon width={22} fill={fill} />
          )}
          {/twitter/g.test(field.type) && (
            <TwitterIcon width={22} fill={fill} />
          )}
          {/tiktok/g.test(field.type) && <TiktokIcon width={22} fill={fill} />}
          {/instagram/g.test(field.type) && (
            <InstagramIcon width={22} fill={fill} />
          )}
          {/youtube/g.test(field.type) && (
            <YoutubeIcon width={25} stroke={fill} />
          )}
          {/linkedin/g.test(field.type) && (
            <LinkedinIcon width={22} fill={fill} />
          )}
          {/soundcloud/g.test(field.type) && (
            <SoundcloudIcon width={22} fill={fill} />
          )}
          {/bandcamp/g.test(field.type) && (
            <BandcampIcon width={25} fill={fill} />
          )}
          {/clubhouse/g.test(field.type) && (
            <ClubhouseIcon width={22} fill={fill} />
          )}
          {/substack/g.test(field.type) && (
            <SubstackIcon width={22} fill={fill} />
          )}
          {/whatsApp/g.test(field.type) && (
            <SignalIcon width={22} fill={fill} />
          )}
          {/telegram/g.test(field.type) && (
            <TelegramIcon width={24} stroke={fill} />
          )}
          {/patreon/g.test(field.type) && (
            <PatreonIcon width={22} fill={fill} />
          )}
          {/twitch/g.test(field.type) && (
            <TwitchIcon width={22} stroke={fill} />
          )}
          {/pinterest/g.test(field.type) && (
            <PinterestIcon width={22} fill={fill} />
          )}
          {/cameo/g.test(field.type) && <CameoIcon width={22} fill={fill} />}
          {/amazon/g.test(field.type) && <AmazonIcon width={22} fill={fill} />}
          {/spotify/g.test(field.type) && (
            <SpotifyIcon width={22} fill={fill} />
          )}
          {/snapchat/g.test(field.type) && (
            <SnapchatIcon width={22} stroke={fill} />
          )}
          {/applemusic/g.test(field.type) && (
            <ApplemusicIcon width={22} fill={fill} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default function Factory({
  fields = [],
  userName = 'User Name',
  avatar,
  noEdit,
}: IProps) {
  const editing = useSelector((state: IStoreState) => state.factory.editing),
    theme = useSelector((state: IStoreState) => state.factory.theme),
    editFields = useSelector((state: IStoreState) => state.factory.editFields),
    dispatch = useDispatch(),
    fieldsState = editing ? editFields : fields;

  const editHundler = () => {
    if (editing) {
      dispatch(setEditDone());
    } else {
      dispatch({ type: 'setEdit' });
    }
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      fieldsState,
      result.source.index,
      result.destination.index,
    );

    dispatch({ type: 'setEditFields', payload: items });
  };

  const imageDialog = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/gif, image/jpeg, image/svg';

    input.onchange = (e: any) => {
      let file = e.target.files[0];

      if(file?.size > 1000000){
        alert('File size is limited to 1MB')
        return;
      }

      if (file) dispatch(setAvatar(file));
    };

    input.click();
  };

  return (
    <>
      {noEdit ? null : (
        <motion.div
          layoutId="editControlls"
          onClick={editHundler}
          className={styles.edit}
        >
          {editing ? (
            <>
              <div className={styles.text}>Done</div>
              <div className={styles.iconWrapper}>
                <Image src="/static/done.svg" layout="fill" />
              </div>
            </>
          ) : (
            <>
              <div className={styles.text}>Edit</div>
              <div className={styles.iconWrapper}>
                <Image src="/static/edit.svg" layout="fill" />
              </div>
            </>
          )}
        </motion.div>
      )}
      <div className={styles.factory}>
        <div className={styles.avatar}>
          <div
            className={`${styles.imageWrapper} ${
              avatar ? styles.avatarExist : ''
            }`}
          >
            <Image
              src={
                avatar
                  ? `${
                      process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
                        ? 'http://localhost:3000'
                        : 'http://link-for-me.herokuapp.com'
                    }/file/${avatar}`
                  : '/static/user.svg'
              }
              layout="fill"
            />
          </div>
        </div>
        {editing && (
          <div className={styles.controlls}>
            <div className={styles.item} onClick={imageDialog}>
              {avatar ? 'Change Photo' : 'Add Photo'}
            </div>
          </div>
        )}
        {!editing && (
          <div className={`${styles.userName} ${styles[theme?.selected]}`}>
            {userName}
          </div>
        )}
        {editing ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="droppable"
              renderClone={(provided: any, snapshot: any, rubric: any) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style,
                  )}
                >
                  <ElementFilter
                    index={0}
                    theme={theme}
                    item={fieldsState[rubric.source.index]}
                    editing={editing}
                  />
                </div>
              )}
            >
              {(provided: any, snapshot: any) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fieldsState.map((item, index) => {
                    const draggableId: string = item.id;
                    return (
                      <Draggable
                        key={item.id || item._id}
                        draggableId={draggableId}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            // {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <ElementFilter
                              dragHandleProps={{ ...provided.dragHandleProps }}
                              theme={theme}
                              item={item}
                              index={index}
                              editing={editing}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className={styles.wrapper}>
            {fieldsState.map((item) => (
              <ElementFilter
                theme={theme}
                editable={!noEdit}
                key={item.id}
                item={item}
                editing={editing}
              />
            ))}
            <SocialIcons theme={theme} fields={fieldsState} />
          </div>
        )}
      </div>
    </>
  );
}
