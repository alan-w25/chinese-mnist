import sys 
import os 
from dataclasses import dataclass
import torch
from torch.utils.data import Dataset, DataLoader

from ml_model.scripts.exception import CustomException
from ml_model.scripts.logger import logging


from torch import nn



@dataclass 
class ModelTrainerConfig: 
    model_save_path: str = os.path.join('ml_model', 'models', 'saved_model.pth')
    
    
class ModelTrainer: 
    def __init__(self): 
        self.model_trainer_config = ModelTrainerConfig()
    
    def train_model(self, model, train_data:Dataset, num_epochs:int, learning_rate:float, batch_size: int): 
        try:
            device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
            logging.info(f"Device being used to train: {device}")
            model = model.to(device)
            
            criterion = nn.CrossEntropyLoss()
            optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
            train_loader = DataLoader(dataset=train_data, batch_size=batch_size, shuffle=True)
            
            train_losses = [] 
            
            for epoch in range(num_epochs):
                model.train()
                total_loss_tr = 0
                total_tr_correct = 0 
                total_tr_predictions = 0
                
                for images, labels in train_loader: 
                    images = images.to(device)
                    labels = labels.to(device)
                    
                    outputs = model(images)
                    loss = criterion(outputs, labels)
                    total_loss_tr+=loss.item()
                    
                    _, predicted = torch.max(outputs.data, 1)
                    total_tr_predictions+=labels.size(0)
                    total_tr_correct +=(predicted == labels).sum().item()
                    
                    optimizer.zero_grad()
                    loss.backward()
                    optimizer.step()
                    
                train_losses.append(total_loss_tr / len(train_loader))
                train_accuracy = total_tr_correct / total_tr_predictions
                
                logging.info(f"Epoch [{epoch + 1}/{num_epochs}], Loss: {total_loss_tr / len(train_loader)}, Accuracy: {train_accuracy}")
            logging.info("Training complete")
            return model, train_losses
        except Exception as e:
            logging.error("error while training model")
            raise CustomException(e, sys)
    '''
    This function will evaluate the model on the test data
    '''
    def evaluate_model(self, model, test_data:Dataset, batch_size:int):
        device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
        logging.info(f"Device being used to test: {device}")
        model = model.to(device)
        model.eval() 
        
        criterion = nn.CrossEntropyLoss()
        test_loader = DataLoader(test_data, batch_size=batch_size)
        total_loss_t = 0
        total_t_correct = 0 
        total_t_predictions = 0
        
        logging.info("Initiating model evaluation")
        with torch.no_grad(): 
            for images,labels in test_loader:
                images = images.to(device)
                labels = labels.to(device)
                
                outputs = model(images)
                loss = criterion(outputs, labels)
                total_loss_t += loss.item()
                
                _, predicted = torch.max(outputs.data, 1)
                total_t_predictions+=labels.size(0)
                total_t_correct +=(predicted == labels).sum().item()
        
        accuracy = 100 * total_t_correct / total_t_predictions
        logging.info("Model evaluation complete!")
        logging.info(f'Accuracy of the model on the test data: {accuracy} %')
        return total_loss_t / len(test_loader), accuracy

        
    '''This function will initiate model training; train model on data then test it on test data'''    
    def initiate_model_trainer(self, model, train_data: Dataset, test_data: Dataset):
        try: 
            trained_model, train_losses = self.train_model(model, train_data, num_epochs=10, learning_rate=0.001, batch_size=64)
            os.makedirs(os.path.dirname(self.model_trainer_config.model_save_path), exist_ok=True)
            torch.save({
                'model_state_dict': trained_model.state_dict(),
                'model_architecture': type(trained_model).__name__,
                'num_classes': trained_model.fc2.out_features
            }, self.model_trainer_config.model_save_path)
            
            logging.info("Model training completed and model saved")
            
            test_loss, test_accuracy = self.evaluate_model(trained_model, test_data, batch_size=64)
            return test_loss, test_accuracy


            
        except Exception as e: 
            logging.error("error in training") 
            raise CustomException(e, sys)
            
        #very basic cnn with 2 conv layers and 2 fc layers
                
