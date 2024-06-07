from setuptools import find_packages, setup
from typing import List

HYPHEN_E_DOT = '-e .'
def get_requirements(file_path:str) -> List[str]:
    '''
    This function will return the list of requirements
    '''
    
    requirements = [] 
    with open(file_path, 'r') as file:
        requirements = file.readlines()
        requirements = [req.replace('\n', '') for req in requirements]
        
        if HYPHEN_E_DOT in requirements:
            requirements.remove(HYPHEN_E_DOT)
        
    return requirements

setup(
    #parameters/metadata about project
    name='chinese-mnist-detection', 
    version = '0.0.1', 
    author='Alan',
    author_email='alan.lw25@gmail.com',
    packages=find_packages(),
    install_requires=get_requirements('requirements.txt')
)