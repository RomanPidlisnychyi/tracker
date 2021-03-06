import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { trackerActions } from '../../redux/tracker';
import styles from './CreateTracker.module.css';

export default function CreateTracker() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const handlerSubmit = e => {
    e.preventDefault();

    dispatch(trackerActions.set(name));
    setName('');
  };
  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter tracker name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <button className={styles.button} type="submit" />
    </form>
  );
}
