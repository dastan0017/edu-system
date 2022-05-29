import { Spinner } from 'react-bootstrap'
import styles from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.loader_overlay}>
      <div className={styles.loader}>
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    </div>
  )
}
