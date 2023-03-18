import Container from "./Container";

const Main = ({ children }: { children: any }) => {
  return (
    <>
      <Container>
        <main className="min-h-[calc(100vh-64px)] w-full px-[25px] overflow-hidden">
          {children}
        </main>
      </Container>
    </>
  );
};

export default Main;
