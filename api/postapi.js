import axios from 'axios';


const PostApi = async (url,req_data,secure) => {
  console.log(url,"url")
    const headers = {
        'Content-Type': 'application/json',
      };
      if (secure){
          headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MjQ2NTYxLCJpYXQiOjE2NzUxNjAxNjEsImp0aSI6IjE5NzIxY2VkZTM2NDQ0YTNhZmQyZjRhNTgwOWZiODM4IiwidXNlcl9pZCI6Ijk5OTk5OTk5OTkifQ.Ebo8FRikkYZ5sCQTneyqxunWM-aB2dQ1j0VkGfulZvI'//+global.user_session
      }
    const result = await axios.post(global.globalurl+url, 
 JSON.stringify(req_data),{headers}
    );
    console.log(result.status,headers)
    // console.log(data);
  
    return result;
  };

 const PostForm = async(url,form_data)=>{
    console.log(url,"url",form_data)
    const headers = { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MjQ2NTYxLCJpYXQiOjE2NzUxNjAxNjEsImp0aSI6IjE5NzIxY2VkZTM2NDQ0YTNhZmQyZjRhNTgwOWZiODM4IiwidXNlcl9pZCI6Ijk5OTk5OTk5OTkifQ.Ebo8FRikkYZ5sCQTneyqxunWM-aB2dQ1j0VkGfulZvI',//+global.user_session, 
      "Content-Type": "multipart/form-data"
    };
    const result = await axios.post(global.globalurl+url, 
      form_data,{headers}
         );
      return result;
  }

  const GetApi = async (url,secure) => {
    console.log(url,"url")
      const headers = {
          'Content-Type': 'application/json',
        };
        if (secure){
            headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MjQ2NTYxLCJpYXQiOjE2NzUxNjAxNjEsImp0aSI6IjE5NzIxY2VkZTM2NDQ0YTNhZmQyZjRhNTgwOWZiODM4IiwidXNlcl9pZCI6Ijk5OTk5OTk5OTkifQ.Ebo8FRikkYZ5sCQTneyqxunWM-aB2dQ1j0VkGfulZvI'//+global.user_session
        }
      const result = await axios.get(global.globalurl+url, 
      {headers}
      );
      console.log(result.status,headers)
      // console.log(data);
    
      return result;
    };
  export  {PostApi,PostForm,GetApi};