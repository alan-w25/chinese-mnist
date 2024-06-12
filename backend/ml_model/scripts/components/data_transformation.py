import os 
import sys 
import pandas as pd 
from ml_model.scripts.exception import CustomException
from ml_model.scripts.logger import logging
from torchvision.transforms import transforms
from torch.utils.data import Dataset, DataLoader
from PIL import Image 
from dataclasses import dataclass


class ChineseMNISTDataset(Dataset): 
    def __init__(self, df: pd.DataFrame, root_dir, transform=None): 
        self.annotations = df
        self.root_dir = root_dir 
        self.transform = transform
    def __len__(self): 
        return len(self.annotations)
    
    def __getitem__(self, idx): 
        # load the image name
        img_name = os.path.join(self.root_dir, self.annotations.iloc[idx]['img_name'] + '.jpg')
        image = Image.open(img_name).convert('L')
        label = int(self.annotations.iloc[idx]['class'])
        
        if self.transform: 
            image = self.transform(image)
        
        return image,label

@dataclass 
class DataTransformationConfig: 
    image_data_path: str=os.path.join('ml_model','data','raw','images')

class DataTransformation: 
    def __init__(self):
        self.transformation_config = DataTransformationConfig()
    '''
    This function will preprocess the data, mainly adding extra columns for convenience
    '''
    def preprocess_data(self, df:pd.DataFrame):
        try: 
            # add image name column 
            # add value to class mappings 
            # add height and width columns for images 
            val_to_class = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 100: 11, 1000: 12, 10000: 13, 100000000: 14}
            df['class'] = df['value'].map(val_to_class)
            df['img_name'] = df.apply(lambda row: f'input_{row["suite_id"]}_{row["sample_id"]}_{row["code"]}', axis = 1)
            df['width'] = 64 
            df['height'] = 64 
            
            return df 
        except Exception as e: 
            logging.error("Some error in preprocessing the data")
            raise CustomException(e, sys)
            
         
        
    '''
    This function will initiate data preprocessing for train and test raw data
    returns two custom tensor datasets that represent the train and test data    
    '''
    
    def initiate_data_preprocessing(self, train_data_path: str, test_data_path: str):
        try: 
            train_data = pd.read_csv(train_data_path)
            test_data = pd.read_csv(test_data_path)
            
            logging.info("Loaded raw data successful")
            logging.info("Intiating data preprocesing")
            
            processed_train_data = self.preprocess_data(train_data)
            processed_test_data = self.preprocess_data(test_data)
            
            logging.info("successfully preprocessed raw df")
            logging.info("Initializing tensor dataset creation")
            
            transform = transforms.Compose([
                transforms.Grayscale(num_output_channels=1),
                transforms.Resize((64, 64)),
                transforms.ToTensor(),
                transforms.Normalize((0.5,), (0.5,))
            ])

            
            train_dataset = ChineseMNISTDataset(processed_train_data, root_dir=self.transformation_config.image_data_path, transform=transform)
            test_dataset = ChineseMNISTDataset(processed_test_data, root_dir=self.transformation_config.image_data_path, transform=transform)
            
            logging.info("successfully developed tensor datasets")
            
            return train_dataset, test_dataset
        except Exception as e: 
            logging.error("Error in data initiating the preprocessor")
            raise CustomException(e, sys)
                    
