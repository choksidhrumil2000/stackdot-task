export default function ProductNode({product}){
    return (
        <div class="card" style={{width: '100%',minHeight:'100%'}}>
  <img src={product.image} class="card-img-top" alt={product.title} width={'100%'} height={180}/>
  <div class="card-body">
    <h5 class="card-title">{product.title}</h5>
    <p>${product.price}</p>
     </div>
</div>
    )
}