from backend.app.models.vanilla_cnn import vanilla_cnn
import torch
def load_model(model_path: str):
    checkpoint = torch.load(model_path)
    model_architecture = checkpoint['model_architecture']
    num_classes = checkpoint['num_classes']
    
    if model_architecture == 'vanilla_cnn':
        model = vanilla_cnn(num_classes)
    else:
        raise ValueError(f"Unknown model architecture: {model_architecture}")

    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()
    return model
