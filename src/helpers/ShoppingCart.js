export const formatPrice = (price) => {
    let num_parts = parseFloat(price).toFixed(2).split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
}

export const getDiscountedPrice = (discount, price) => {
    let x = (Number(discount) * parseFloat(price)) / 100;
    x = price - x;
    return formatPrice(x);
}


export const totalPrice = function(items) {
    let total = 0;
   
    try{
        items.forEach( (item) => {
          total = total + parseFloat(item.p);
        });
        total = formatPrice(total);
    }
    catch(error){
        console.log(error);
    }
    return total;
}

export const totalDiscount = (items) => {
    let discount = 0;
    try{
        items.forEach( (item) => {
            if(Number(item.d) > 0){
                let x = (Number(item.d) * parseFloat(item.p)) / 100;
                discount = discount + x;
            }
        });
    }
    catch(error){
        console.log(error);
    }
    discount = discount > 0 ? '- '+formatPrice(discount) : 0;
    return discount;
    
}

export const finalPrice = (items) => {
    let total = 0;
    let discount = 0;
    items.forEach( (item) => {
      total = total + parseFloat(item.p);
      if(Number(item.d) > 0){
        let x = (Number(item.d) * parseFloat(item.p)) / 100;
        discount = discount + x;
      }
    });
    let price = total - discount;
    return formatPrice(price);
}

export const setIva = (tax, items) => {
    let total = 0;
    let discount = 0;
    items.forEach( (item) => {
        total = total + parseFloat(item.p);
        if(Number(item.d) > 0){
            let x = (Number(item.d) * parseFloat(item.p)) / 100;
            discount = discount + x;
        }
    });
    
    let iva = (tax * (total - discount)) / 100;
    return formatPrice(iva);
}

export const applyIva = (tax, items) => {
    let total = 0;
    let discount = 0;
    items.forEach( (item) => {
        total = total + parseFloat(item.p);
        if(Number(item.d) > 0){
            let x = (Number(item.d) * parseFloat(item.p)) / 100;
            discount = discount + x;
        }
    });
    
    let iva = (tax * (total - discount)) / 100;

    return formatPrice((iva + (total - discount)));
}