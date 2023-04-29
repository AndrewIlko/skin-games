const EmptyStore = () => {
  return (
    <>
      <div className="w-full">
        <div className="text-center mt-[80px]">
          <span className="font-[500]">
            <span className="leading-[80px] text-[48px]">☹️</span>
            <br />
            We could not find anything...
          </span>
          <br />
          <span className="text-neutral-600">Try refining your filters</span>
        </div>
      </div>
    </>
  );
};

export default EmptyStore;
