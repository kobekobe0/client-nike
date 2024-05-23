import {useState} from 'react'
import timeAgo from '../constants/timeAgo';

const UserInitials = ({ username, name:nameSplit, email }) => {
  return (
    <div className="flex items-center">
        <div className="bg-gray-300 text-2xl mr-2 text-white w-8 h-8 rounded-full flex items-center justify-center p-8">
         {nameSplit?.split(' ').map(name => name[0]).join('').toUpperCase()}
        </div>
        <div>
            <h2 className="text-lg">{nameSplit}</h2>
            <h2 className="text-sm text-gray-600">{username}</h2>
            <p className="text-gray-500">{email}</p>
        </div>
    </div>

  );
};

const OrderCard = ({order, status,changeStatus}) => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <div className="rounded-sm p-8 shadow-md flex flex-col cursor-pointer hover:bg-gray-100" >
            <div className="flex justify-between" onClick={()=>setShowDetails(!showDetails)}>
                <UserInitials {...order.client}/>
                <div className="flex flex-col items-end justify-between">
                    <h2 className="text-sm font-medium">{order.paymentMethod}</h2>
                    <p className="text-sm text-gray-500">{timeAgo(order?.createdAt)}</p>
                    <p className="text-sm text-gray-500">{order.products.length} items</p>
                </div>
            </div>
            {
                showDetails && (
                    <div className="flex flex-col gap-2 mt-8 ease-in-out duration-100">
                        <div className="mb-4">
                            <h2 className="text-sm font-medium">Address</h2>
                            <p className="text-sm text-gray-500">{order.address.street}, {order.address.number}, {order.address.barangay}, {order.address.municipality}, {order.address.city}, {order.address.zipCode}</p>
                        </div>
                        {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <img src={product.id.mainImage} alt={product.id.name} className="w-16 h-16 object-cover"/>
                                    <div>
                                        <h2 className="text-sm font-medium">{product.id.name}</h2>
                                        <p className="text-sm text-gray-500">Size: {product.size}</p>
                                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                                <h2 className="text-sm font-medium">₱{product.id.price * product.quantity}</h2>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-end">
                            <h2 className="text-sm font-medium">Total: ₱{order.products.reduce((acc, product) => acc + product.id.price * product.quantity, 0)}</h2>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default OrderCard
