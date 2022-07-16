import { useDispatch, useSelector } from 'react-redux';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import UserWidget from '../widgets/UserWidget';

export default function ContactPage() {
  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => state.user);

  if (user === null) {
    return (
      <LayoutWithAppbar>
      <UserWidget/>
        no user!
      </LayoutWithAppbar>
    );
  } else {
    return (
      <LayoutWithAppbar>
        <UserWidget/>
        {user.name}<br />
        {user.email}<br />
      </LayoutWithAppbar>
    );
  }
}