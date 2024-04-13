import json
from flask import Response
from typing import Union

class ApiResponse:
    def __init__(self, status: int, data: Union[list, dict,  None], success: bool = True, message: str = "success"):
        self.response = {}
        self.response["status"] = status
        self.response["body"] = data
        self.response["message"] = message
        self.response["success"] = success
        self.json = Response(
            response=json.dumps(self.response),
            mimetype="application/json",
            status=self.response["status"]
        )
    
