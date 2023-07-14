export const mockServiceWorkerRegister = () => {
  // should be called before render function
  const mockRegister = jest.fn();

  Object.defineProperty(navigator, 'serviceWorker', {
    value: {
      register: mockRegister,
    },
    configurable: true,
  });

  return mockRegister;
};
