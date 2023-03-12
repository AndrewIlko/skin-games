import Container from "./Container";

const Header = ({ children }: { children: any }) => {
  return (
    <>
      <div className="border-b ">
        <Container>
          <header className="w-full h-[64px] flex items-center justify-between px-[25px]">
            {children}
          </header>
        </Container>
      </div>
    </>
  );
};

export default Header;
