import axios from 'axios';


const PostApi = async (url,req_data,secure) => {
  console.log(url,"url")
    const headers = {
        'Content-Type': 'application/json',
      };
      if (secure){
          headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MDcxODYyLCJpYXQiOjE2NzQ5ODU0NjIsImp0aSI6ImU3ODYzMGU5ZmU5OTRlZWI4YzEwNjQ5MTNmZGNmZWQyIiwidXNlcl9pZCI6Ijk5OTk5OTk5OTkifQ.Ni5JXpj-SRdN0TnN0lyuqha6_Yu3-oaP1QvVoq9vO_4'//+global.user_session
      }
    const result = await axios.post(global.globalurl+url, 
 JSON.stringify(req_data),{headers}
    );
    console.log(result.status,headers)
    // console.log(data);
  
    return result;
  };

 const PostForm = async(url,form_data)=>{
    console.log(url,"url")
    const headers = { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MDcxODYyLCJpYXQiOjE2NzQ5ODU0NjIsImp0aSI6ImU3ODYzMGU5ZmU5OTRlZWI4YzEwNjQ5MTNmZGNmZWQyIiwidXNlcl9pZCI6Ijk5OTk5OTk5OTkifQ.Ni5JXpj-SRdN0TnN0lyuqha6_Yu3-oaP1QvVoq9vO_4',//+global.user_session, 
      "Content-Type": "multipart/form-data"
    };
    const result = await axios.post(global.globalurl+url, 
      form_data,{headers}
         );
      return result;
  }
  export  {PostApi,PostForm};