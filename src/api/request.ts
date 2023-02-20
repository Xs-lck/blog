import axios from 'axios'
const ins = axios.create();
ins.interceptors.response.use(function(resp){
    
    if(resp.data.code !== 0){
        // showMessage(resp.data.msg, 'warn', 1000);
        return null;
    }
    // showMessage('注册成功', 'success', 1000);
    return resp.data.data;
})
export default ins;