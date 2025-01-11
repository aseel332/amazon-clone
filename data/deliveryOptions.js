import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //default export 

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
},{
  id:'2',
  deliveryDays: 3,
  priceCents: 499
},{
  id:'3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });
    return deliveryOption || deliveryOptions [0];
}

export function calculateDeliveryDate(deliveryOption){
      const today = dayjs();

      let days = deliveryOption.deliveryDays;

      

      let tempDay = 1;

      while (days > 0){
  
      const Date = today.add(
        tempDay, 
      'days'
      );

      

      const day = Date.format(
        'dddd'
        );

        
        

      if(day === 'Sunday' || day === 'Saturday'){
        tempDay += 1;
      }
      else{
        tempDay += 1;
        days = days - 1;
      }

    }

    

    const deliveryDate = today.add(
      tempDay - 1, 
    'days'
    );

    

      return deliveryDate;
  
     
}

export function getDateString(deliveryDate){
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
    );
    return dateString;
}

export function getDateStringOrder(deliveryDate) {
  // Parse the deliveryDate string into a Day.js object
  let dateString = dayjs(deliveryDate);

  // Format the Day.js object
  dateString = dateString.format('MMMM D');

  return dateString;
}

export function getDateStringArriving(deliveryDate) {
  // Parse the deliveryDate string into a Day.js object
  let dateString = dayjs(deliveryDate);

  // Format the Day.js object
  dateString = dateString.format('dddd, MMMM D');

  return dateString;
}