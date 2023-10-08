import mongoose from 'mongoose';
import {User} from '../api/mongoModels';
import {URI} from '../api/mongoData.js';

async function getName() {
    try {
      await mongoose.connect(URI);
      let data = await User.findOne({firstName: 'Fred'});
      await mongoose.disconnect();
      if (data) {
        data = data.firstName + ' ' + data.lastName
      }
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}

export default async function DataDisplay() {
    const name = await getName()
   
    return (
        <div>
          <div>User: {name}</div>
        </div>
      );
}


