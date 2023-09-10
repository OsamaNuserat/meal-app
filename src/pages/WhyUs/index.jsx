import {
  MapPinIcon,
  PencilIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
const features = [
  {
    name: "Customizable Orders",
    description:
      "Tailor your meal exactly to your preferences with our app's intuitive customization feature, ensuring every dish is made just the way you like it.",
    icon: PencilIcon,
  },
  {
    name: "Real-time Order Tracking",
    description:
      "Stay informed and eliminate uncertainty by tracking your order in real time on the app's map interface, so you know exactly when your food will arrive.",
    icon: MapPinIcon,
  },
  {
    name: "Restaurant Ratings and Reviews",
    description:
      "Make informed choices with access to genuine customer ratings and reviews for each restaurant, helping you discover the best dining experiences in your area.",
    icon: StarIcon,
  },
  {
    name: "Group Ordering Made Easy:",
    description:
      "Simplify group orders with our built-in group feature, allowing friends or colleagues to collectively choose their meals, ensuring everyone gets what they want without the hassle.",
    icon: ShoppingCartIcon,
  },
];
const WhyUs = () => {
  return (
    <div className="mx-auto bg-indigo-950 py-24 px-24">
      <div className="mx-auto max-w-4xl lg:text-center">
        <h2 className="text-2xl font-semibold leading-7 text-white">Why us</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Everything you need to know about our app
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-200">
          Our app is designed to make your life easier. With a wide range of
          features and a user-friendly interface, you can enjoy a seamless and
          hassle-free experience from start to finish.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-200">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-400">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default WhyUs;
