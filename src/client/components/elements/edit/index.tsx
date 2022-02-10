import { Field } from 'src/server/users/interfaces/user.interface';
import styles from './styles.module.sass';
import { useDispatch } from 'react-redux';
import Done from '../../../static/done.svg';
import Tooltip from 'rc-tooltip';
import { motion } from 'framer-motion';

import Clock from '../../../static/clock.svg';
import Lock from '../../../static/lock.svg';
import Thumb from '../../../static/thumb.svg';
import Delete from '../../../static/delete.svg';
import Show from '../../../static/show.svg';
import Hide from '../../../static/hide.svg';
import Draggable from '../../../static/draggable.svg';

import { doneSingleEdit, deleteSingle, uploadFields } from 'src/client/store/factory/actions';
import { useState, memo } from 'react';

interface IProps {
  data: Field;
  type: string;
  singleEdit?: boolean;
  dragHandleProps: any;
  index?: number;
  withAnimation?: boolean;
}

export default memo(function Edit({
  data,
  singleEdit,
  dragHandleProps,
  withAnimation,
  index,
}: IProps) {
  const isHeader = data.type === 'header';
  const dispatch = useDispatch();
  const updateHundler = (
    value: string | boolean,
    fieldName: string,
    fieldId: string,
  ) => {
    dispatch({
      type: singleEdit ? 'updateFieldSingle' : 'updateField',
      payload: { value, fieldName, fieldId },
    });
  };
  const [doneHover, setDoneHover] =  useState(false)
  const [animationComplete, setAnimationComplete] = useState(false);
  const deleteHundler = () => {
    if (singleEdit) {
      dispatch(deleteSingle(data.id));
    } else {
      dispatch({ type: 'deleteField', payload: data.id });
    }
  };
  const delayMS = 50 * Number(index);
  const delayS = animationComplete ? 0 : delayMS ? delayMS / 1000 : 0;
  const Controll = ({title, onClick, Icon, type}: any) => {
    const [color, setColor] = useState("#B78467")
    return (
      <Tooltip
        placement="bottom"
        trigger="hover"
        overlay={() => <span>{title}</span>}
      >
        <div
          className={styles.item}
          onClick={onClick}
          onMouseEnter={() => setColor("#8f6248")}
          onMouseLeave={() => setColor("#B78467")}
        >
          {type === 'stroke' ? (
            <Icon stroke={color} />
          ) : (
            <Icon fill={color} />
          )}
        </div>
      </Tooltip>
    )
  }
  return (
    <motion.div
      key={data.id}
      initial={!withAnimation ? 'visible' : 'hidden'}
      animate="visible"
      transition={{ duration: animationComplete ? 0 : 0.1, delay: delayS }}
      variants={{
        visible: { opacity: 1, maxHeight: 150 },
        hidden: { opacity: 0, maxHeight: 35 },
      }}
      className={styles.row}
      onAnimationComplete={() => {
        setAnimationComplete(true);
      }}
    >
      {!singleEdit && (
        <motion.div
          {...dragHandleProps}
          className={styles.draggableZone}
          key={'2' + data.id}
          initial={'hidden'}
          animate="visible"
          transition={{ duration: animationComplete ? 0 : 0.1, delay: delayS }}
          variants={{
            visible: { opacity: 1, maxWidth: 30 },
            hidden: { opacity: 0, maxWidth: 0 },
          }}
          exit="hidden"
        >
          <div className={styles.whiteWrapper}>
            <Draggable width={18} height={18} fill="#B78467" />
          </div>
        </motion.div>
      )}
      <div className={styles.edit}>
        <input
          className={`${styles.title} ${isHeader ? styles.margin : ''}`}
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={(e) => updateHundler(e.target.value, 'title', data.id)}
          onBlur={() => {
            dispatch(uploadFields());
          }}
        />
        {!isHeader && (
          <input
            className={styles.link}
            type="text"
            placeholder="Link"
            value={data.link}
            onChange={(e) => updateHundler(e.target.value, 'link', data.id)}
            onBlur={() => {
              dispatch(uploadFields());
            }}
          />
        )}
        <div className={styles.controlls}>
          <Controll
            title="Clock"
            onClick={() => {
              dispatch({
                type: 'openPopup',
                payload: {
                  method: 'clock',
                  props: { singleEdit, field: data },
                },
              });
            }}
            Icon={(props:any) => (
              <Clock width={18} height={18} {...props} />
            )}
          />
          <Controll
            title="Thumbnail"
            onClick={() => {
              dispatch({
                type: 'openPopup',
                payload: {
                  method: 'thumb',
                  props: { fieldId: data.id, singleEdit },
                },
              });
            }}
            type="stroke"
            Icon={(props:any) => (
              <Thumb width={18} height={18} {...props} />
            )}
          />
          <Controll
            title="Lock"
            onClick={() => {
              dispatch({
                type: 'openPopup',
                payload: {
                  method: 'lock',
                  props: { singleEdit, field: data },
                },
              });
            }}
            Icon={(props:any) => (
              <Lock width={18} height={18} {...props} />
            )}
          />
          <Controll
            title={data.hide ? 'Hide' : 'Show'}
            onClick={() => {
              updateHundler(!!!data.hide, 'hide', data.id);
            }}
            Icon={(props:any) => {
              return (
                <>
                  {data.hide ? (
                    <Hide
                      width={20}
                      height={20}
                      style={{ marginTop: 2, marginLeft: -3 }}
                      {...props}
                    />
                    
                  ) : (
                    <Show
                      width={20}
                      height={20}
                      style={{ marginTop: 2, marginLeft: -3 }}
                      {...props}
                    />
                  )}
                </>
              )
            }}
          />
          <div className={styles.itemRight}>
          <Controll
            title="Delete"
            onClick={() => {
              deleteHundler()
            }}
            Icon={(props:any) => (
              <Delete width={18} height={18} {...props} />
            )}
          />
          </div>
        </div>
        {singleEdit && (
          <Tooltip
            placement="top"
            trigger="hover"
            overlay={() => <span>Done</span>}
          >
            <div
              onMouseEnter={() => setDoneHover(true)}
              onMouseLeave={() => setDoneHover(false)}
              className={styles.done}
              onClick={() => dispatch(doneSingleEdit())}
            >
              <Done fill={doneHover ? "#8f6248" : "#B78467"} />
            </div>
          </Tooltip>
        )}
      </div>
    </motion.div>
  );
});
