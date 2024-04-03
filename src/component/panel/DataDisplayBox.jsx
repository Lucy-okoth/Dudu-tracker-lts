import React, { useMemo } from "react";
import { List, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const DataDisplayBox = ({ uploadedCovariance }) => {
  // Sort the uploadedCovariance array based on the filename
  const sortedUploadedCovariance = useMemo(() => {
    return [...uploadedCovariance].sort((a, b) =>
      a.file.filename.localeCompare(b.file.filename)
    );
  }, [uploadedCovariance]);

  const filteredUploadedCovariance = sortedUploadedCovariance.filter(covariance => covariance.fileType);

  return (
    <Box p={2} mt={3} bgcolor="grey.90" borderRadius={2}>
      <Typography variant="h6" gutterBottom>
        Data Overview
      </Typography>
      <List>
        {filteredUploadedCovariance.map((covariance, index) => (
          <ListItem key={covariance.file.id}>
            {index + 1}. {covariance.fileType} - {covariance.file.filename}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DataDisplayBox;