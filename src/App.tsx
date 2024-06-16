/* REACT */
import { FC } from "react";

/* CONFIGS */
import router from "./configs/router";
import query from "./api/config/query";
import AntdConfigProvider from "./configs/antd";
import GlobalProviders from "./configs/providers";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";

const App: FC = () => {
  return (
    <AntdConfigProvider>
      <QueryClientProvider client={query}>
        <GlobalProviders>
          <RouterProvider router={router} />
        </GlobalProviders>
      </QueryClientProvider>
    </AntdConfigProvider>
  );
};

export default App;

