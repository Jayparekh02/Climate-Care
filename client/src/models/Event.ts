export interface Event {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  createdBy: string;
  volunteers: [
    {
      _id: string;
      name: string;
      email: string;
    }
  ];
}
