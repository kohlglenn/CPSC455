
import { ReduxState } from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { getUserAsync } from '../../models/rest';
import { setUser } from '../../actions';
import { User } from '../../models';
import { useLocation, useNavigate } from 'react-router';


export default function UserWidget(props: any) {

    const dispatch = useDispatch();
    const user = useSelector((state: ReduxState) => state.user);
    useEffect(() => {
        if (!user) {
            getUserAsync().then((res: Response) => {
                if (res.ok) {
                    res.json().then((user: User) => {
                        dispatch(setUser(user));
                    });
                }
            }).catch((err)=>{
            });
        }
    }, [user]);
    return (
        <div>
        </div>
    );

}