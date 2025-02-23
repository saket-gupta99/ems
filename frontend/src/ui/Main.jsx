function Main({ isSidebarOpen, children }) {
  return (
    <main
      className={`row-start-2 row-end-3 ${
        !isSidebarOpen ? "col-start-1" : "col-start-2"
      }  col-end-3 p-3`}
    >
      {children}
    </main>
  );
}

export default Main;
