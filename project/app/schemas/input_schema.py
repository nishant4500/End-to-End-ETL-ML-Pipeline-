from pydantic import BaseModel

class InputData(BaseModel):
    Dept: int
    IsHoliday: int
    Temperature: float
    Fuel_Price: float
    CPI: float
    Unemployment: float
    Size: float
    Year: int
    Month: int
    Week: int