const Container = ({ children }: { children: any }) => {
  return (
    <>
      <div className="w-full mx-auto max-w-[1280px] h-full">{children}</div>
    </>
  );
};

export default Container;
