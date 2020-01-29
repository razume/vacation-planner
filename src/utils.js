import moment from 'moment';

const format = dateString => {
  return moment(dateString).format('dddd MM/DD/YYYY');
};

const diff = ({ endDate, startDate }) => {
  return moment(endDate).diff(moment(startDate), 'days');
};

export { diff, format };
