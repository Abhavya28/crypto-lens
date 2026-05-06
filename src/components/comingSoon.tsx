const ComingSoon = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0b1120] text-white px-4">

      <div className="text-center space-y-4">

        <h1 className="text-4xl md:text-5xl font-bold">
          Coming Soon 🚀
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
          We are working hard to bring something amazing for you.
          Stay tuned for updates!
        </p>

        <div className="flex justify-center gap-2 mt-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>

      </div>

    </section>
  );
};

export default ComingSoon;