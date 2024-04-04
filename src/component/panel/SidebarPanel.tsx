"use client";


import {
 Box,
 Button,
 Checkbox,
 Divider,
 Drawer,
 FormControl,
 FormControlLabel,
 FormGroup,
 FormLabel,
 Grid,
 IconButton,
 InputLabel,
 List,
 ListItem,
 MenuItem,
 Select,
 TextField,
 Typography,
} from "@mui/material";
import { FilePond } from "react-filepond";
import { useState } from "react";


// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { Save, Delete as DeleteIcon } from "@mui/icons-material";
import { FilePondFile } from "filepond";
import RuleForm from "./RuleForm";
import { DatePicker } from "@mui/x-date-pickers";
import DataDisplayBox from "./DataDisplayBox";
//  <DataDisplayBox uploadedCovariance={uploadedCovariance} /> 
export interface UploadedFileInfo {
 fileType: string;
 file: FilePondFile;
 min?: number;
 max?: number;
}


const SidebarPanel = ({
 open,
 toggleSidePanel,
}: {
 open: boolean;
 toggleSidePanel: () => void;
}) => {
 const [selectedCsv, setSelectedCsv] = useState<any>([]);
 const [fileType, setFileType] = useState<string>("");
 const [covariance, setCovariance] = useState<any>([]);
 const [uploadedCovariance, setUploadedCovariance] = useState<
   UploadedFileInfo[]
 >([]);
 const [affectedArea, setAffectedArea] = useState<any[]>([]);


 // will move the selected file and it's info to uploadedState
 const handleUploadCovarianceInfo = () => {
   const file: FilePondFile = covariance[0];


   const fileInfo: UploadedFileInfo = {
     fileType,
     file,
   };


   setUploadedCovariance((prevState) => [...prevState, fileInfo]);
   // reset the uploader
   setFileType("");
   setCovariance([]);
 };


 // supposed to delete any uploaded covariance info -> (to fix -> deleting but not refreshing after state is updated)
 const handleDeleteUploaded = (index: number) => {
   console.log("Delete at index ", index);
   const tempUpload = uploadedCovariance;
   tempUpload.splice(index, 1);
   setUploadedCovariance(tempUpload);
 };


 // Generates list info for uploaded covariance
 const selectedCovarianceList = uploadedCovariance.map((covariance, index) => (
   <ListItem
     key={index}
     secondaryAction={
       <IconButton
         edge="end"
         aria-label="delete"
         onClick={() => handleDeleteUploaded(index)}
       >
         <DeleteIcon />
       </IconButton>
     }
   >
     {covariance.fileType} - {covariance.file.filename}
   </ListItem>
 ));


 const rulesInputForm = uploadedCovariance.map((covariance, index) => (
   <RuleForm
     key={index}
     uploadedInfo={covariance}
     index={index}
     setUploadedInfo={setUploadedCovariance}
   />
 ));


 return (
   <Drawer open={open} onClose={toggleSidePanel}>
     <Box
       px={3}
       py={4}
       display="flex"
       flexDirection="column"
       gap={1}
       width={600}
     >
       <Typography fontWeight="bold" textAlign="center" variant="h6">
         Configuration Panel
       </Typography>
       <Divider />
       <FormControl>
         <FormLabel htmlFor="csv">Upload Files</FormLabel>
         <FilePond
           id="csv"
           files={selectedCsv}
           onupdatefiles={setSelectedCsv}
           labelIdle='(csv  excel  tiff) <span class="filepond--label-action"> Browse</span>'
           credits={false}
           instantUpload={false}
           allowRevert={false}
         />
       </FormControl>


       <Box
         sx={{
           display: "grid",
           gridTemplateColumns: "repeat(3, 1fr)",
           gridGap: 10,
         }}
       >
         <FormControl fullWidth>
           <InputLabel id="fileType">Type</InputLabel>
           <Select
             labelId="fileType"
             label="Type"
             id="fileType"
             value={fileType}
             onChange={(e) => setFileType(e.target.value)}
           >
             {/* <MenuItem value="Temperature">Temperature</MenuItem>
             <MenuItem value="NDVI">NDVI</MenuItem>
             <MenuItem value="Precipitation">Precipitation</MenuItem> */}
           </Select>
         </FormControl>
         <FormControl fullWidth>
           <FilePond
             id="csv"
             files={covariance}
             onupdatefiles={setCovariance}
             labelIdle='<span class="filepond--label-action">Browse</span>'
             credits={false}
             instantUpload={false}
             allowRevert={false}
           />
         </FormControl>
         <Box display="flex" justifyContent="end" alignItems="center">
           <Button
             variant="contained"
             color="primary"
             size="large"
             disabled={fileType?.length === 0 || covariance.length === 0}
             onClick={handleUploadCovarianceInfo}
           >
             Upload
           </Button>
         </Box>
       </Box>
       <DataDisplayBox uploadedCovariance={uploadedCovariance} />
<Divider />
       <Divider />
       <List>{selectedCovarianceList}</List>
       <Box>{rulesInputForm}</Box>
       <Box>
         <FormGroup>
           <FormControlLabel label="AND" control={<Checkbox />} />
           <FormControlLabel label="OR" control={<Checkbox />} />
         </FormGroup>
       </Box>


       <Box>
         <Grid container columnGap={4}>
           <Grid item xs={12} my={2}>
             <Typography>Grid Size (KM)</Typography>
           </Grid>
           <Grid item xs={12} md={4}>
             <DatePicker label="Start Period" views={["month", "year"]} />
           </Grid>
           <Grid item xs={12} md={4}>
             <DatePicker label="End Period" views={["month", "year"]} />
           </Grid>
         </Grid>
       </Box>
       <TextField
         label="Constraints"
         type="number"
         variant="outlined"
         fullWidth
       />
       <TextField
         label="Cell size (km)"
         type="number"
         variant="outlined"
         fullWidth
       />
       <TextField
         label="Travel Speed (km/time)"
         type="number"
         variant="outlined"
         fullWidth
       />
       <Divider />
       {/* <FormControl fullWidth>
         <FormLabel htmlFor="affectedArea">Affected Area</FormLabel>
         <FilePond
           id="affectedArea"
           files={affectedArea}
           onupdatefiles={setAffectedArea}
           labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
           credits={false}
           instantUpload={false}
           allowRevert={false}
         />
       </FormControl> */}
       <Box mb={3}>
         <Button
           variant="contained"
           type="submit"
           size="large"
           endIcon={<Save />}
         >
           Save
         </Button>
       </Box>
       <Divider />
       <Box mt={3}>
         <Grid container columnGap={2} rowGap={3}>
           {/* <Grid item xs={5}>
             <TextField type="number" label="Lat" fullWidth />
           </Grid>
           <Grid item xs={5}>
             <TextField type="number" label="Lon" fullWidth />
           </Grid> */}
           <Grid item xs={5}>
             <DatePicker label="Start Period" views={["month", "year"]} />
           </Grid>
           <Grid item xs={5}>
             <TextField type="number" label="Diff" fullWidth />
           </Grid>
         </Grid>
         <Button variant="contained" color="primary" sx={{ mt: 2 }}>
           Run Model
         </Button>
       </Box>
     </Box>
   </Drawer>
 );
};
export default SidebarPanel;