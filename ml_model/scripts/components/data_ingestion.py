import os 
import sys 
import pandas as pd 
from ml_model.scripts.exception import CustomException
from ml_model.scripts.logger import logging 
from dataclasses import dataclass 
from sklearn.model_selection import train_test_split

'''
This class represents the file paths for raw and processed data
'''
@dataclass 
class DataIngestionConfig: 
    train_data_path: str=os.path.join('ml_model','data','processed','train.csv')
    test_data_path: str=os.path.join('ml_model','data','processed','test.csv')
    raw_data_path: str=os.path.join('ml_model','data','raw','chinese_mnist.csv')
    
class DataIngestion: 
    def __init__(self): 
        self.ingestion_config = DataIngestionConfig() 
        
    
    '''
    This function will read the raw data from the file path and then split the data into train and test data
    '''
    def initiate_data_ingestion(self): 
        logging.info("Initiating data ingestion")
        try:
            
            df = pd.read_csv(self.ingestion_config.raw_data_path)
            logging.info("Read data from raw path")
            
            #create the directory or the file path if it does not exist
            os.makedirs(os.path.dirname(self.ingestion_config.train_data_path), exist_ok = True)
            
            logging.info("Initiating train test split")
            
            train_set,test_set = train_test_split(df, test_size=0.2, random_state=42)
            
            train_set.to_csv(self.ingestion_config.train_data_path, index=False, header=True)
            test_set.to_csv(self.ingestion_config.test_data_path, index=False, header=True)
            
            logging.info("data ingestion successful!")
            
            return self.ingestion_config.train_data_path, self.ingestion_config.test_data_path
            
        except Exception as e: 
            logging.error("Error in data ingestion")
            raise CustomException(e, sys)
if __name__ == "__main__":
    obj = DataIngestion() 
    obj.initiate_data_ingestion()