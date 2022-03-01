
const formatOrderFields =(products)=>{
const fields ={
    summary:[],
    discounts: 0,
    total:0,
    totalNet:0,
    taxes:0,

}
    fields.summary = products.map((product)=>{ return product.id})

        products.map(product => {
            fields.discounts = fields.discounts + (product.price * product.units) / 100* product.discount;
            fields.totalNet = fields.totalNet + (product.price * product.units) ;
            fields.taxes = fields.taxes +  (product.price * product.units)/100*19;
            fields.total= fields.total + (product.price * product.units) -(product.price * product.units) / 100* product.discount;
        });

return fields

}

const formatDate =()=>{
    const date = new Date()
    const applicationDate = date.setDate(date.getDate());
    const deliveryDays = 4;
    const deliveryDate = date.setDate(date.getDate() + deliveryDays);

    return { applicationDate, deliveryDate }
}

module.exports = {
    formatOrderFields,
    formatDate
};