const FullScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative left-1/2 container w-screen -translate-x-1/2 lg:mx-auto">
      {children}
    </div>
  );
};

export default FullScreen;
