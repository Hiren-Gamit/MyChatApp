const messages = [
    {
      fromName: 'Hiren',
      to: 2,
      date: '9:32 AM',
      id: 0,
      message: "Hello world!",
      read: false
    },
    {
      fromName: 'Anish',
      to: 2,
      date: '6:12 AM',
      message:'Long time no chat',
      id: 1,
      read:true
    },
    {
      fromName: 'Jordan Firth',
      to: 0,
      date: '4:55 AM',
      message: 'Report Results',
      id: 2
  
    },
    {
      fromName: 'Kelly Richardson',
      to: 2,
      date: 'Last Week',
      message: 'Placeholder Headhots',
      id: 7
    }
  ];
  
  export const getMessages = () => messages;
  
  export const getMessage = (id) => messages.find(m => m.id === id);
