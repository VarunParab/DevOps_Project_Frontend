import React,{useEffect, useState} from 'react'
import AWS from '../awsConfig'
import axios from 'axios'
const s3 = new AWS.S3();
function ToSendNewsletter() {
  //const id = 'varunparab7@gmail.com'
  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  const [mailId, setMailId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState('');
  // const data = {
  //   mailId: mailId,
  //   objectUrl: objectUrl
  // };
//   const sendEmailButton = () => {
//     if(objectUrl === '') {
//       alert("Please upload the Newsletter first")
//     }
//     if(objectUrl !== '') {
//     axios.post('http://localhost:4002/sendEmail', data)
//     .then(res => {
//       console.log(res.data);
//       alert("You have successfully sent the Newsletter")
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }
//  } 


  useEffect(() => {
  axios.get('http://localhost:4001/getEmail')
  .then(res => {
    setMailId(res.data.join(','))
  })
  .catch(err => {
    console.log(err)
    })
  },[])
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const uploadObjectToS3 = (file) => {
      const params = {
        Bucket: 'devops-newsletter-storage',
        Key: `${selectedFile.name}`,
        Body: file,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Object uploaded successfully:', data.Location);
          setObjectUrl(data.Location);
          console.log(objectUrl);
        }
      });
    };

    if (selectedFile) {
      uploadObjectToS3(selectedFile);
      // You can use AWS SDK or any other method to upload the file to your desired destination
    } else {
      console.log('No file selected.');
    }
  };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const params = {
        Destination: {
          ToAddresses: [mailId]
        },
        Message: {
          Body: {
            Text: {
              Data: objectUrl
            }
          },
          Subject: {
            Data: 'Newsletter'
          }
        },
        Source: 'varunparab7@gmail.com' // Replace with your SES verified email address
      };
  
      try {
        await ses.sendEmail(params).promise();
        console.log('Email sent successfully');
        // Reset the form
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  return (
    <div>
    <br />
    <br />
    <label className="form-label" htmlFor="customFile">Upload your Newsletter here</label>
    <input type="file" className="form-control" id="customFile" onChange={handleFileChange} />
    <br />
    <button onClick={handleFileUpload}>Upload</button>
    <br />
    <br />
    <br />
    <form onSubmit={handleSubmit}>
      <button type="submit">Send Email</button>
    </form>
    </div>
  )
}

export default ToSendNewsletter