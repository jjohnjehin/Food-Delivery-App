import { useLocation } from "react-router-dom";
import { Box,Grid,Typography } from "@mui/material";

export const PaymentSummary = () => {
  const location = useLocation();
  const { method, bank } = location.state || {};

  return (
    <div>
      <h2>Selected Payment Method:</h2>
      <p>{method}</p>
      {method === "netbanking" && <p>Selected Bank: {bank}</p>}
    </div>
  );
};
