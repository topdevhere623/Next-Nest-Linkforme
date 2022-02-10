import { Field, Theme } from 'src/server/users/interfaces/user.interface';
import { useState } from 'react';
import styles from './styles.module.sass';
import Button from '../elements/button';
import Header from '../elements/header';
import Edit from '../elements/edit';
import EditSvg from '../../static/edit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from 'src/client/store/reducers';
import Tooltip from 'rc-tooltip';
import { motion } from 'framer-motion';

const EditButon = ({
  id,
  setHover: setHoverP,
}: {
  id: string;
  setHover?: any;
}) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  return (
    <Tooltip placement="left" trigger="hover" overlay={() => <span>Edit</span>}>
      <div
        className={`${styles.edit}${hover ? ' ' + styles.active : ''}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          setHoverP(false);
          dispatch({ type: 'setEditElement', payload: id });
        }}
      >
        <div className={styles.image}>
          <EditSvg fill={hover ? '#ffffff' : '#000000'} />
        </div>
      </div>
    </Tooltip>
  );
};

interface IProps {
  editing: boolean;
  editable?: boolean;
  item: Field;
  theme: Theme;
  dragHandleProps?: any;
  index?: number;
}

const ElementFilter = ({
  editing,
  editable = false,
  item,
  theme,
  dragHandleProps,
  index,
}: IProps) => {

  if(item.type && /socialIcon\-/g.test(item.type)) return null;

  const [hover, setHover] = useState(false);
  const editingEl = useSelector(
    (state: IStoreState) => state.factory.editingEl,
  );
  const singleEdit = item.id === editingEl;

  if (editing || singleEdit) {
    return (
      <div className={styles.fieldWrapper}>
        <Edit
          index={index}
          withAnimation={singleEdit}
          dragHandleProps={dragHandleProps}
          singleEdit={singleEdit}
          type={item.type}
          data={item}
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={styles.fieldWrapper}
    >
      {hover && editable && <EditButon setHover={setHover} id={item.id} />}
      {item.type === 'link' && (
        <Button theme={theme} editing={editable} key={item.id} data={item} />
      )}
      {item.type === 'music' && (
        <Button
          music={true}
          theme={theme}
          editing={editable}
          key={item.id}
          data={item}
        />
      )}
      {item.type === 'header' && (
        <Header theme={theme} editing={editable} key={item.id} data={item} />
      )}
    </div>
  );
};

export default ElementFilter;
