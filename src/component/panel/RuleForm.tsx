import { Box, Grid, TextField, Typography } from "@mui/material";
import { UploadedFileInfo } from "./SidebarPanel";

const RuleForm = ({
  uploadedInfo,
  index,
  setUploadedInfo,
}: {
  uploadedInfo: UploadedFileInfo;
  index: number;
  setUploadedInfo: any;
}) => {
  return (
    <Box my={2}>
      <Typography fontWeight="bold">
        {uploadedInfo.fileType} - {uploadedInfo.file.filename}
      </Typography>
      <Grid container columnGap={3}>
        <Grid item xs={12} md={4}>
          <TextField variant="outlined" label="Min" type="number" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField variant="outlined" label="Max" type="number" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default RuleForm;
