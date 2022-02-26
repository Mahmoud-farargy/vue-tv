import Api from "@/services/Api";
import { authInfo } from "../services/Info";
// Another way is to use asynchonous code in store actions 
const fetchData = (suffix = "get_live_categories") => {
    return new Promise((resolve, reject) => {
        const { password, userName } = authInfo;
        Api().get(`/player_api.php?username=${userName}&password=${password}&action=${suffix}`).then((res) => {
            const bodyData = res?.data;
            if(bodyData){
               resolve(bodyData);
            }else{
               reject([]);
            }
           
        }).catch(() => {
            reject([]);
        });
    })
}
export default fetchData;