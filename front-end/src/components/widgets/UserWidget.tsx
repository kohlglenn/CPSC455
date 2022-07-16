
import { ReduxState } from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAsync } from '../../models/rest';
import { setUser } from '../../actions';
import { User } from '../../models';


export default function userWidget(props: any) {

    const dispatch = useDispatch();
    const user = useSelector((state: ReduxState) => state.user);
    useEffect(() => {
        if (!user) {
            getUserAsync().then((res: Response) => {
                if (res.ok) {
                    return res.json().then((user: User) => {
                        dispatch(setUser(user));
                    });
                }
            });
        }
    }, []);
    return (
        <div>
        </div>
    );

}