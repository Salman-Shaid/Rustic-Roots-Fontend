import { Link } from "react-router-dom";

const HotFoodCard = ({ food }) => {
  return (
    <div className="border border-gray-200 p-5 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
      <div className="relative">
        <img 
          src={food.foodImage} 
          alt={food.foodName} 
          className="w-full h-56 object-cover rounded-lg"
        />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          {food.foodCategory}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">{food.foodName}</h3>
        <p className="text-gray-600 text-lg font-medium">Price: <span className="text-green-600">${food.price}</span></p>
        <p className="text-sm text-gray-500">Available Quantity: {food.quantity}</p>
      </div>

      <div className="mt-5">
        <Link to={`/foods/${food._id}`}>
          <button className=" bg-green-600 text-white py-2 px-6 rounded-lg hover:rounded-full text-lg font-medium hover:bg-green-700 transition-all">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HotFoodCard;
