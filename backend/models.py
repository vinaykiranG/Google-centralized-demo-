from pydantic import BaseModel
from typing import List, Dict, Optional

class DemoSummary(BaseModel):
    id: str
    title: str
    description: str
    tags: List[str]
    thumbnail: str
    status: str

class DemoDetail(DemoSummary):
    walkthrough_video: Optional[str] = None
    links: Optional[Dict[str, str]] = None
    tech_stack: Optional[List[str]] = None
    analytics: Optional[Dict[str, int]] = None
