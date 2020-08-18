import client from './client';

const register = (userInfo) => client.post('/signup', userInfo);

export default { register };
