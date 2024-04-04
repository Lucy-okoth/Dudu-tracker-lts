// import React from "react";
// import { FilePond, FilePondProps as FilePondBaseProps } from "react-filepond";

// interface FilePondWithLabelIdleProps extends FilePondBaseProps {
//   labelIdle?: JSX.Element;
// }

// const FilePondWithLabelIdle: React.FC<FilePondWithLabelIdleProps> = ({
//   labelIdle,
//   ...filePondProps
// }) => {
//   return (
//     <div>
//       {labelIdle && (
//         <div
//           dangerouslySetInnerHTML={{
//             __html: labelIdle.props.children as string,
//           }}
//         />
//       )}
//       <FilePond {...filePondProps} />
//     </div>
//   );
// };

// export default FilePondWithLabelIdle;