import charity1 from './pictures/charity.jpg';
import charity2 from './pictures/charity2.jpg';
import charity3 from './pictures/charity3.jpg';
import logo from './pictures/logo.png';

const Hero = () => {
  return (
    <div className="relative pt-12 bg-brand-beige h-screen flex-grow border-t-2 border-t-brand-grayGreen text-center font-serif flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative bg-[url(https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="relative z-10 mt-0">
        <img
          src={logo}
          alt="Logo"
          className="absolute inset-y-[-2rem] inset-x-[-18rem] h-32 w-full object-contain -translate-x-1/5"
        />

        <h1 className="relative text-7xl font-bold text-center text-white">
          Hands{" "}
          <span className="bg-gradient-to-br from-teal-300 to-lime-300 bg-clip-text text-transparent">
            Together
          </span>
        </h1>
      </div>

      <div className="mt-24 px-4 sm:px-8 flex justify-center relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 w-3/5 mb-8">
          <div className="p-1 bg-gradient-to-br from-teal-300 to-lime-300 rounded-l-lg">
            <img
              src={charity1}
              alt="People helping with donations"
              className="rounded-l-lg object-cover w-full h-64 sm:h-48 md:h-64 lg:h-80"
            />
          </div>
          <div className="p-1 bg-gradient-to-br from-teal-300 to-lime-300">
            <img
              src={charity2}
              alt="More donation help"
              className="object-cover w-full h-64 sm:h-48 md:h-64 lg:h-80"
            />
          </div>
          <div className="p-1 bg-gradient-to-br from-teal-300 to-lime-300 rounded-r-lg">
            <img
              src={charity3}
              alt="Donations box"
              className="rounded-r-lg object-cover w-full h-64 sm:h-48 md:h-64 lg:h-80"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-2/3 text-center flex flex-col items-center justify-center pb-16">
        <p className="w-3/4 text-white text-lg leading-relaxed px-4 sm:px-8 bg-black/50 rounded-md p-4">
          HandsTogether is your friendly online space where connecting with
          charities in your area has never been easier! Designed with simplicity
          and joy in mind, our platform helps you discover amazing causes, stay
          up-to-date with their efforts, and even interact with them—just like
          your favorite social media. Whether you’re looking to volunteer,
          donate, or simply cheer on a cause close to your heart, HandsTogether
          is here to make it happen. With an intuitive design and vibrant
          community, you’ll love every moment spent exploring and supporting
          charities. Don’t wait—sign up today and start making a difference with
          HandsTogether!
        </p>
      </div>
    </div>
  );
};


export default Hero;





