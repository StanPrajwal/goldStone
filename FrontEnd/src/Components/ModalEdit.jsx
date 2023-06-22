import { Box, Modal, Stack, Typography, TextField, Autocomplete, Button } from "@mui/material"
import Axios from "axios"
import { padding } from "@mui/system";
import { useFormik, FormikProvider, Field, Form } from "formik";
import * as Yup from "yup";
const userSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    gender: Yup.string().required("Gender is required"),
})

const gender = ["Male", "Female", "Other"]
function EditUser({ open, handleClose, editUser }) {
    console.log("edit user",editUser)
    const id = editUser?.original?._id

    const formik = useFormik({
        initialValues: {
            name: editUser.name,
            email: editUser.email,
            gender: editUser.gender

        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            Axios.put(`http://localhost:4000/user/update/${id}`,{values})
            .then(res=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })

        }
    })
    const {
        errors,
        touched,
        values,
        isSubmitting,
        getFieldProps,
        handleSubmit,
        setFieldValue
    } = formik
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return <>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                    <Stack
                        sx={
                            {
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }
                        }
                    >
                        <Stack>
                            <Typography variant="h5" textAlign="center">Edit User Details</Typography>
                        </Stack>
                        <Stack width="100%" mb={4}>
                            <TextField required id="standard" label="Name" variant="standard"
                                {...getFieldProps("name")}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                            />


                        </Stack>
                        <Stack width="100%" mb={4}>
                            <TextField required id="standard" label="Email" variant="standard"
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Stack>
                        <Stack width="100%" mb={4}>
                            <Autocomplete
                                onChange={(e, newValue) => {
                                    console.log(newValue);
                                    setFieldValue("gender", newValue)
                                }}
                                options={gender}
                                renderInput={(params) => <TextField {...params} label="Gender" />}
                            />
                        </Stack>

                        <Stack>
                            <Button type="submit" variant="contained">Update</Button>
                        </Stack>
                    </Stack>
                </Form>
            </FormikProvider>
        </Modal>
    </>
}
export default EditUser