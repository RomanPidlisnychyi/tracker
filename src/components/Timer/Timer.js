import { useSelector } from 'react-redux';
import { trackerSelectors } from '../../redux/tracker';
import styles from './Timer.module.css';

export default function Timer({ trackerId }) {
  const time = useSelector(state =>
    trackerSelectors.getCurrentFormatTimeById(state, trackerId)
  );

  return (
    <div className={styles.span}>
      {time.hours}:{time.mins}:{time.secs}
    </div>
  );
}
