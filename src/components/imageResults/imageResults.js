import React,{Component} from "react";
import propTypes from "prop-types";
import {GridList,GridTile} from 'material-ui/GridList';
import IconButton from "material-ui/IconButton";
import ActionZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";

class ImageResults extends Component{
    state={
        open:false,
        currentImg:''
    }
    handleOpen=img=>{
        this.setState({open:true,currentImg:img})
    }
    handleClose=()=>{
        this.setState({open:false});
    }
    render()
    {
        let imageList;
        const{images}=this.props

        if(images)
        {
            imageList=(
                <GridList cols={3}>
                {
                    images.map(img=>(
                        <GridTile 
                        title={img.title}
                        key={img.id}
                        actionIcon={
                            <IconButton onClick={()=>this.handleOpen(`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`)}>
                                <ZoomIn color="white"/>
                            </IconButton>
                            
                        }>
                         <img src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`} alt="" />
                        </GridTile>
                    ))
                }

                </GridList>
            )
        }else{
            imageList=null;
        }
        const action=[
            <FlatButton label="Close" primary={true} onClick={this.handleClose}  />
           
        ] 
        return(
            <div style={{marginLeft:50,marginRight:50,marginTop:20}}>
            {imageList}
            <Dialog 
            actions={action}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <img src={this.state.currentImg} alt="" style={{width:'100%'}}/>

            </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes={
    images:propTypes.array.isRequired
}

export default ImageResults;