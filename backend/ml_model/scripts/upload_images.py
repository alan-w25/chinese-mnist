import psycopg2 
import csv 
import os 
from datetime import datetime
import pandas as pd 
from logger import logging
from exception import CustomException
import sys

DB_NAME = "alanwu"
DB_USER = "alanwu"
DB_PASSWORD = "yourpassword"
DB_HOST = "localhost"
DB_PORT = "5432"

csv_file_path = 'ml-model/data/raw/chinese_mnist_classes.csv'
image_dir_path = 'ml-model/data/raw/images'
base_path = 'ml-model/data/raw'


#test if we are able to see the folder and the csv file 
df = pd.read_csv(csv_file_path)
print(df.head())

logging.info("testing the path of csv file successfully")
logging.info("Connecting to the database")


def insert_image_data(suite_id, sample_id, code, value, character, class_, img_name, width, height, image_data):
    try:
        cur.execute("""
            INSERT INTO image_samples (
                suite_id, sample_id, code, value, character, class, img_name, width, height, image_data, timestamp
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """,
            (suite_id, sample_id, code, value, character, class_, img_name, width, height, image_data, datetime.now())
        )
        logging.info(f"Inserted data for {img_name}")
    except Exception as e:
        logging.error(f"Failed to insert data for {img_name}: {e}")
        raise CustomException(e, sys)


try:
    conn = psycopg2.connect(
        dbname = DB_NAME, 
        user = DB_USER,
        password = DB_PASSWORD,
        host = DB_HOST,
        port = DB_PORT
    )
    cur = conn.cursor() 
    logging.info("Connected to the database successfully!")
    
except Exception as e:
    logging.error("Failed to connect to the database")
    raise CustomException(e, sys)

try: 
    for index, row in df.iterrows():
        suite_id = int(row['suite_id'])
        sample_id = int(row['sample_id'])
        code = int(row['code'])
        value = int(row['value'])
        character = row['character']
        class_ = int(row['class'])
        img_name = row['img_name']
        width = int(row['width'])
        height = int(row['height'])
        img_path = os.path.join(image_dir_path, img_name + ".jpg")
        try: 
            with open(img_path, 'rb') as f:
                img_data = f.read()
            insert_image_data(suite_id, sample_id, code, value, character, class_, img_name, width, height, img_data)    
        except FileNotFoundError:
            logging.error(f"Image file not found: {img_path}")
        except Exception as e: 
            logging.error(f"Failed to read image file {img_path}: {e}")
            raise CustomException(e, sys)
            
       
except FileNotFoundError:
    logging.error(f"CSV file not found: {csv}")
except Exception as e:
    logging.error(f"Failed to read CSV file: {e}")
    raise CustomException(e, sys)

try:
    conn.commit()
    cur.close()
    conn.close()
    logging.info("Transaction committed and connection closed.")
except Exception as e:
    logging.error(f"Failed to commit transaction or close connection: {e}")
    raise CustomException(e, sys)

    